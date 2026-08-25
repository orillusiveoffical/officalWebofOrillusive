/**
 * Safe API client utility for Orillusive
 * Prevents "Unexpected token 'A' / '<' is not valid JSON" errors by inspecting HTTP status & Content-Type.
 */

export interface SafeApiResponse<T = any> {
  ok: boolean;
  status: number;
  data: T | null;
  error: string | null;
}

export async function safeFetch<T = any>(
  url: string,
  options?: RequestInit
): Promise<SafeApiResponse<T>> {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';

    if (!res.ok) {
      let errorMessage = `Server error (${res.status} ${res.statusText || 'Error'})`;

      if (contentType.includes('application/json')) {
        try {
          const json = await res.json();
          errorMessage = json.error || json.message || errorMessage;
        } catch {
          // JSON parsing failed, use default error message
        }
      } else {
        try {
          const text = await res.text();
          if (text && text.length < 200 && !text.includes('<!DOCTYPE') && !text.includes('<html')) {
            errorMessage = text;
          }
        } catch {
          // Ignore text extraction error
        }
      }

      return {
        ok: false,
        status: res.status,
        data: null,
        error: errorMessage
      };
    }

    if (contentType.includes('application/json')) {
      try {
        const json = await res.json();
        return {
          ok: json.success !== false,
          status: res.status,
          data: json,
          error: json.success === false ? (json.error || json.message || 'Operation failed') : null
        };
      } catch {
        return {
          ok: false,
          status: res.status,
          data: null,
          error: 'Received invalid JSON data from server.'
        };
      }
    }

    // Non-JSON 200 response
    const text = await res.text();
    return {
      ok: true,
      status: res.status,
      data: text as any,
      error: null
    };
  } catch (netErr: any) {
    return {
      ok: false,
      status: 0,
      data: null,
      error: netErr?.message || 'Network connection error. Please check server connection.'
    };
  }
}
