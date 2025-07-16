import netWorthData from "../assets/netWorth.json";

const NetWorth = () => {
    const { assets, liabilities } = netWorthData;
    let totalAssets = 0;
    let totalLiabilities = 0;

    for (let key in assets) {
        totalAssets += assets[key];
    }

    for (let key in liabilities) {
        totalLiabilities += liabilities[key];
    }

    const netWorth = totalAssets - totalLiabilities;

    return (
        <div className="dashboard-box">
            <h2>Net Worth</h2>
            {/* TODO: Create styles for these items */}
            {/* toLocaleStrings for proper currency displaying */}
            <p>Total Assets: {totalAssets.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
            <p>Total Liabilities: {totalLiabilities.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
            <p>Net Worth: {netWorth.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>

            <table className="networth-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {(() => {
                        const rows = [];
                        for (let name in assets) {
                            rows.push(
                                <tr key={"asset-" + name}>
                                    <td>Asset</td>
                                    <td>{name}</td>
                                    <td>{assets[name].toLocaleString("en-US", {style:"currency", currency:"USD"})}</td>
                                </tr>
                            );
                        }
                        for (let name in liabilities) {
                            rows.push(
                                <tr key={"liability-" + name}>
                                    <td>Liability</td>
                                    <td>{name}</td>
                                    <td>-{liabilities[name].toLocaleString("en-US", {style:"currency", currency:"USD"})}</td>
                                </tr>
                            );
                        }
                        return rows;
                    })()}
                </tbody>
            </table>
        </div>
    );
};

export default NetWorth;