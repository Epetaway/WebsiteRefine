export interface BrandImage {
  url: string;
  alt: string;
}

interface BrandIdentityViewerProps {
  applications?: BrandImage[];
  campaigns?: BrandImage[];
}

export default function BrandIdentityViewer({ applications, campaigns }: BrandIdentityViewerProps) {
  return (
    <div className="bg-card p-6 rounded-card">
      <h3 className="text-lg font-bold text-textPrimary mb-4">Brand Identity</h3>
      {applications && applications.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-textSecondary mb-2">Applications</h4>
          <div className="grid grid-cols-2 gap-4">
            {applications.map((img, idx) => (
              <img key={idx} src={img.url} alt={img.alt} className="rounded-lg" />
            ))}
          </div>
        </div>
      )}
      {campaigns && campaigns.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-textSecondary mb-2">Campaigns</h4>
          <div className="grid grid-cols-2 gap-4">
            {campaigns.map((img, idx) => (
              <img key={idx} src={img.url} alt={img.alt} className="rounded-lg" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
