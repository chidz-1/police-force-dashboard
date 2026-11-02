import decorateWithPagePadding from "@/utils/decorateWithPagePadding";

function DemographicsPage() {
  return (
    <>
      <h1>Demographics</h1>
      <p>
        Gender, age range and officer-defined ethnicity of people searched.
        Vehicle-only searches have no demographic data.
      </p>

      {/* TODO: Visualizations component */}
    </>
  );
}

export default decorateWithPagePadding(DemographicsPage);
