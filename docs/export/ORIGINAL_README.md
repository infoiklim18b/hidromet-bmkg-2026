# Hidromet BMKG 2026

Private interactive prototype based on System_Design_Hidromet_BMKG_2026.doc.

## Included

- National overview, filterable monitoring, sample warnings and details.
- SVG Indonesia map with pan, zoom, layers, opacity, basemap and comparison.
- Product catalogue, global search, metadata JSON and monitoring CSV downloads.
- Original System Design PDF and DOC downloads.
- Demo products and warnings API endpoints.
- Browser-local QC, role review, approval and publication simulation.
- Browser-local feedback form.

## Data and boundaries

All weather values, map fills, warning severities and validity periods are demonstration data for 9 November 2026. The application is not connected to operational BMKG data, OGC, SSO or production RBAC. Role selection demonstrates a workflow and is not an authorization boundary. Local workspace records are editable browser data and are not an immutable audit log.

Country geometry is an indicative low-resolution outline from https://github.com/johan/world.geo.json. Markers are approximate region positions, not observation stations. The geometry is not suitable for official administrative analysis.

## Development

Run installation/build helpers documented by Sites. Use `npm run dev` for a standalone checkout. In managed preview environments, use `sites-preview start <checkout>`.

## Validation

TypeScript check and production Vinext build. Browser checks include initial rendering without hydration errors, filtering Jawa Barat to the correct single data row, global document search and workspace approval requiring a reason. API JSON and document assets are checked separately.

## Production integration

The System Design document describes the intended production services: PostgreSQL/PostGIS, object storage, GIS/OGC, SSO/MFA/RBAC, audit, operational data sources, approval services, observability and DR. These services are not provisioned by this prototype. Replace demo data through authenticated backend services before operational use.
