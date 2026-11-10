import {products,AS_OF} from '@/lib/data';
export async function GET(){return Response.json({mode:'DEMONSTRASI',source:'Dataset contoh rancangan Hidromet BMKG 2026',as_of:AS_OF,version:'1.0',total:products.length,items:products})}
