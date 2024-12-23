import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import Swal from "sweetalert2";

function CreateCategories({ slug /*, nom */ }) {
    const [name, setName] = useState("");
    const [validationError, setValidationError] = useState({});

    // const changeHandler = (event) => {
    //     setImage(event.target.files[0]);
    // };

    // console.log(nom);

    function redirectPage() {
        window.location.replace("/categories");
    }

    const createCategories = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);

        if (slug) {
            await axios
                .get(`http://localhost:8000/api/categories/${slug}`)
                .then(({ data }) => {
                    const { name } = data.categories;
                    setName(name);
                })
                .catch(({ response: { data } }) => {
                    Swal.fire({
                        text: data.message,
                        icon: "error",
                    });
                });
            e.preventDefault();

            const formData = new FormData();
            formData.append("_method", "PATCH");
            formData.append("name", name);

            await axios
                .post(`http://localhost:8000/api/categories/${slug}`, formData)
                .then(({ data }) => {
                    Swal.fire({
                        icon: "success",
                        text: data.message,
                    }).then(() => {
                        redirectPage();
                    });
                })
                .catch(({ response }) => {
                    if (response.status === 422) {
                        setValidationError(response.data.errors);
                    } else {
                        Swal.fire({
                            text: response.data.message,
                            icon: "error",
                        });
                    }
                });
        } else {
            await axios
                .post(`http://localhost:8000/api/categories`, formData)
                .then(({ data }) => {
                    Swal.fire({
                        icon: "success",
                        text: data.message,
                    }).then(() => {
                        redirectPage();
                    });
                })
                .catch(({ response }) => {
                    if (response.status === 422) {
                        setValidationError(response.data.errors);
                    } else {
                        Swal.fire({
                            text: response.data.message,
                            icon: "error",
                        });
                    }
                });
        }
    };

    return (
        <div>
            <div className="p-3 bg-slate-100 rounded-md w-72 mx-auto">
                <div className="mb-3">Create Categories</div>
                <div>
                    {Object.keys(validationError).length > 0 && (
                        <div>
                            <div>
                                <div>
                                    <ul className="mb-0">
                                        {Object.entries(validationError).map(
                                            ([key, value]) => (
                                                <li key={key}>{value}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={createCategories}>
                        <div className="grid mb-3">
                            <label className="mb-3">Name</label>
                            {slug ? (
                                <input
                                    className="f max-w-xs"
                                    type="text"
                                    placeholder={/*nom*/ slug}
                                    onChange={(event) => {
                                        setName(event.target.value);
                                    }}
                                />
                            ) : (
                                <input
                                    className="f max-w-xs"
                                    type="text"
                                    onChange={(event) => {
                                        setName(event.target.value);
                                    }}
                                />
                            )}
                            {/* <input
                                className="f max-w-xs"
                                type="text"
                                // value={slug}
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                            /> */}
                        </div>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateCategories;

if (document.getElementById("createCategories")) {
    const Index = ReactDOM.createRoot(
        document.getElementById("createCategories")
    );

    const Slug = document
        .getElementById("createCategories")
        .getAttribute("slug");

    // const nom = document.getElementById("createCategories").getAttribute("nom");

    Index.render(
        <React.StrictMode>
            <CreateCategories slug={Slug} /*nom={nom}*/ />
        </React.StrictMode>
    );
}
