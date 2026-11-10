import {warnings,AS_OF} from '@/lib/data';
export async function GET(){return Response.json({mode:'DEMONSTRASI',notice:'Skenario 9 November 2026, bukan peringatan aktif operasional.',as_of:AS_OF,version:'1.0',total:warnings.length,items:warnings})}
