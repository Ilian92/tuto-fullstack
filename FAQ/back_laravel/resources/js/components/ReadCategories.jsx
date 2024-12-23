import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import Swal from "sweetalert2";

function ReadCategories() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            await axios
                .get(`http://localhost:8000/api/categories`)
                .then(({ data }) => {
                    setData(data);
                });
        };

        fetchCategories();
    }, []);

    function refreshPage() {
        window.location.reload(false);
    }

    const deleteCategories = async (id) => {
        const isConfirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            return result.isConfirmed;
        });

        if (!isConfirm) {
            return;
        }

        // await axios
        //     .delete(`http://localhost:8000/api/categories/${id}`)
        //     .then(({ data }) => {
        //         Swal.fire({
        //             icon: "success",
        //             text: data.message,
        //         });
        //         fetchCategories();
        //     })
        //     .catch(({ response: { data } }) => {
        //         Swal.fire({
        //             text: data.message,
        //             icon: "error",
        //         });
        //     });

        const fetchCategories = async () => {
            await axios
                .delete(`http://localhost:8000/api/categories/${id}`)
                .then(({ data }) => {
                    Swal.fire({
                        icon: "success",
                        text: data.message,
                    }).then(() => {
                        refreshPage();
                    });
                })
                .catch(({ response: { data } }) => {
                    Swal.fire({
                        text: data.message,
                        icon: "error",
                    });
                });
        };
        fetchCategories();
        // refreshPage();
    };

    return (
        <div>
            <div className="p-3 mx-10 bg-slate-100 rounded-md">
                <div className="mb-2 flex items-center justify-between w-full">
                    <div>Dashboard Categories</div>
                    <a
                        className="mr-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        href="/categories/add"
                    >
                        Add
                    </a>
                </div>
                <table className="mt-2 max-w-full">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>created at</th>
                            <th>updated at</th>
                            <th>name</th>
                            <th>update</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.categories?.length > 0
                            ? data?.categories?.map((item) => (
                                  <tr key={item.id}>
                                      <td>{item.id}</td>
                                      <td>{item.created_at}</td>
                                      <td>{item.updated_at}</td>
                                      <td>{item.name}</td>
                                      <td>
                                          <a
                                              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                              href={`/categories/add/${item.slug}`}
                                          >
                                              Update
                                          </a>
                                      </td>
                                      <td>
                                          <button
                                              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                              type="button"
                                              onClick={() => {
                                                  deleteCategories(item.id);
                                              }}
                                          >
                                              Delete
                                          </button>
                                      </td>
                                  </tr>
                              ))
                            : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ReadCategories;

if (document.getElementById("readCategories")) {
    const Index = ReactDOM.createRoot(
        document.getElementById("readCategories")
    );

    Index.render(
        <React.StrictMode>
            <ReadCategories />
        </React.StrictMode>
    );
}
