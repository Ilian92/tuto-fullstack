import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

function UpdateCategories() {
    return <div>test</div>;
}

export default UpdateCategories;

if (document.getElementById("updateCategories")) {
    const Index = ReactDOM.createRoot(
        document.getElementById("updateCategories")
    );

    Index.render(
        <React.StrictMode>
            <UpdateCategories />
        </React.StrictMode>
    );
}
