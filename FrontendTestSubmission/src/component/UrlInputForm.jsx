export default function UrlInputForm({ index, data, setData }) {
  const handleChange = (e) => {
    const newData = [...data];
    newData[index][e.target.name] = e.target.value;
    setData(newData);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>
        Original URL:
        <input
          type="text"
          name="originalUrl"
          required
          placeholder="https://example.com"
          value={data[index].originalUrl}
          onChange={handleChange}
        />
      </label>
      <label>
        Validity (minutes):
        <input
          type="number"
          name="validity"
          value={data[index].validity}
          onChange={handleChange}
        />
      </label>
      <label>
        Preferred Code:
        <input
          type="text"
          name="shortCode"
          value={data[index].shortCode}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
