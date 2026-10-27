import { NextRequest, NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/validations/enquiry';
import { getSupabaseServerClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { EnquirySubmission } from '@/types';

// In-memory fallback storage for seamless prototype demonstration
// if database credentials are not yet configured in local environment.
const localEnquiriesFallbackStore: Map<string, EnquirySubmission> = new Map();

// Helper to generate an authentic ReWear reference code (e.g. RW-2026-8942)
function generateReferenceCode(): string {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RW-${year}-${randomPart}`;
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON request payload',
        },
        { status: 400 }
      );
    }

    // 1. Validate payload against Zod schema
    const validationResult = enquirySchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        const fieldName = err.path.join('.');
        fieldErrors[fieldName] = err.message;
      });

      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed. Please verify your inputs.',
          fieldErrors,
        },
        { status: 422 }
      );
    }

    const validData = validationResult.data;
    const referenceCode = generateReferenceCode();
    const timestamp = new Date().toISOString();

    const recordToInsert: EnquirySubmission = {
      reference_code: referenceCode,
      customer_name: validData.customer_name,
      email: validData.email,
      phone: validData.phone || null,
      garment_type: validData.garment_type,
      garment_condition: validData.garment_condition,
      service_type: validData.service_type,
      budget_range: validData.budget_range,
      preferred_timeframe: validData.preferred_timeframe,
      description: validData.description,
      image_url: validData.image_url || null,
      status: 'pending_review',
      created_at: timestamp,
    };

    // 2. Persist to Supabase if configured
    const supabase = getSupabaseServerClient();

    if (supabase && isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('enquiries')
        .insert([recordToInsert])
        .select('id, reference_code, created_at, status')
        .single();

      if (error) {
        console.error('Supabase database insertion error:', error);
        return NextResponse.json(
          {
            success: false,
            error: 'Failed to save enquiry to Supabase database. Please try again.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined,
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: 'Enquiry successfully submitted and saved to database.',
          storage: 'supabase',
          enquiry: {
            id: data.id,
            reference_code: data.reference_code,
            customer_name: validData.customer_name,
            service_type: validData.service_type,
            garment_type: validData.garment_type,
            status: data.status,
            created_at: data.created_at,
          },
        },
        { status: 201 }
      );
    }

    // 3. Resilient fallback: Store in durable memory cache if Supabase credentials are pending
    localEnquiriesFallbackStore.set(referenceCode, {
      ...recordToInsert,
      id: `local-${Date.now()}`,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry received and saved to prototype storage (Supabase credentials pending in .env).',
        storage: 'local_prototype_fallback',
        enquiry: {
          id: `local-${Date.now()}`,
          reference_code: referenceCode,
          customer_name: validData.customer_name,
          service_type: validData.service_type,
          garment_type: validData.garment_type,
          status: 'pending_review',
          created_at: timestamp,
        },
        note: 'Configure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to enable direct PostgreSQL persistence.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error in POST /api/enquiries:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected internal server error occurred while processing your enquiry.',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference');

  // Health check endpoint
  if (searchParams.get('health') === 'true') {
    return NextResponse.json({
      status: 'healthy',
      supabase_configured: isSupabaseConfigured(),
      timestamp: new Date().toISOString(),
    });
  }

  // Lookup enquiry by reference code
  if (reference) {
    const supabase = getSupabaseServerClient();

    if (supabase && isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('enquiries')
        .select('id, reference_code, customer_name, garment_type, service_type, status, created_at, budget_range')
        .eq('reference_code', reference.trim().toUpperCase())
        .maybeSingle();

      if (error) {
        return NextResponse.json(
          { success: false, error: 'Database query failed' },
          { status: 500 }
        );
      }

      if (!data) {
        return NextResponse.json(
          { success: false, error: `No enquiry found with reference "${reference}"` },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        enquiry: data,
        storage: 'supabase',
      });
    }

    // Check local fallback store
    const localMatch = localEnquiriesFallbackStore.get(reference.trim().toUpperCase());
    if (localMatch) {
      return NextResponse.json({
        success: true,
        enquiry: {
          reference_code: localMatch.reference_code,
          customer_name: localMatch.customer_name,
          garment_type: localMatch.garment_type,
          service_type: localMatch.service_type,
          status: localMatch.status,
          created_at: localMatch.created_at,
          budget_range: localMatch.budget_range,
        },
        storage: 'local_prototype_fallback',
      });
    }

    return NextResponse.json(
      { success: false, error: `No enquiry found with reference "${reference}"` },
      { status: 404 }
    );
  }

  // General list endpoint (returns recent public records or metadata)
  return NextResponse.json({
    endpoint: '/api/enquiries',
    methods: ['POST', 'GET'],
    description: 'ReWear Garment Enquiry API',
    supabase_connected: isSupabaseConfigured(),
  });
}
