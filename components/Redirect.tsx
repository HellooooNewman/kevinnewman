// Static-export-friendly redirect stub: React 19 hoists the <meta> into <head>,
// the script fires instantly, and the link is the no-JS fallback.
export default function Redirect({ to }: { to: string }) {
  return (
    <div className="section container" style={{ textAlign: "center" }}>
      <meta httpEquiv="refresh" content={`0;url=${to}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(to)})`,
        }}
      />
      <p>
        This page has moved. <a href={to}>Continue →</a>
      </p>
    </div>
  );
}
