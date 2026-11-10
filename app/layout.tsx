import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Hidromet BMKG 2026 — Portal Hidrometeorologi',description:'Rancangan interaktif Hidromet BMKG 2026. Monitoring, peringatan dini, geospasial, dan katalog dengan data demonstrasi.',icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="id"><body>{children}</body></html>}
