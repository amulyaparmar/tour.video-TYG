import DynamicIframe from "./DynamicIframe";

export default function AliasPage({ params, searchParams }) {
  return (
    <DynamicIframe alias={params?.alias} initialSearchParams={searchParams} />
  );
}
