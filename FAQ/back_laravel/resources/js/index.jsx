import ReactDOM from "react-dom/client";
import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateCategories from "./components/CreateCategories";
import ReadCategories from "./components/ReadCategories";

function Index() {
    return (
        <div>
            <Routes>
                <Route path="/categories" element={<ReadCategories />} />
                <Route path="/categories/add" element={<CreateCategories />} />
            </Routes>
        </div>
    );
}

export default Index;

// ReactDOM.render(<Index />, document.getElementById("index"));

if (document.getElementById("index")) {
    const Index = ReactDOM.createRoot(document.getElementById("index"));

    Index.render(
        <React.StrictMode>
            <Index />
        </React.StrictMode>
    );
}
