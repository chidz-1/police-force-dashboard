import decorateWithPagePadding from "@/utils/decorateWithPagePadding";

function LocationsPage() {
  return (
    <>
      <h1>Locations</h1>
      <p>
        Approximate locations of searches. data.police.uk anonymises points to
        the nearest street-level map point.
      </p>

      {/* TODO: Visualizations component */}
    </>
  );
}

export default decorateWithPagePadding(LocationsPage);
