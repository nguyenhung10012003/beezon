export default function QuantityChoice({choices, selected, setSelected}: {
  choices: number[],
  selected: number,
  setSelected: (value: number) => void
}) {
  return (
    <>
      <h2 className="mt-8 text-base text-gray-900">Quantity choices</h2>
      <div className="mt-3 flex select-none flex-wrap items-center gap-1">
        {choices.map((choice, index) => {
          return (
            <label className="" key={index}>
              <input
                type="radio"
                name="type"
                defaultValue={choice}
                className="peer sr-only"
                onChange={(e) => {
                  setSelected(parseInt(e.target.value));
                }}
                checked={selected === choice}
              />
              <p
                className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">
                {choice}
              </p>
            </label>)
        })}
      </div>
    </>

  )
}
