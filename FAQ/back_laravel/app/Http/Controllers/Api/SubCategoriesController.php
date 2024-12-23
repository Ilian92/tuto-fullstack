<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreSubCategoriesRequest;
use App\Http\Controllers\Controller;
use App\Models\SubCategories;
use Illuminate\Support\Str;

class SubCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subcategories = SubCategories::all();

        return response()->json([
            'status' => true,
            'subcategories' => $subcategories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSubCategoriesRequest $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $subcategories = SubCategories::create([
            'name' => $request->name,
            'description' => $request->description,
            'content' => $request->content,
            'icone' => $request->icone,
            'slug' => Str::slug($request->name, '-')
        ]);

        return response()->json([
            'status' => true,
            'message' => "SubCategorie Created successfully!",
            'subcategories' => $subcategories
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SubCategories  $subcategories
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $subcategories = SubCategories::where('slug', '=', $slug)->firstOrFail();

        return response()->json([
            'status' => true,
            'subcategories' => $subcategories
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SubCategories  $subcategories
     * @return \Illuminate\Http\Response
     */
    public function edit(SubCategories $subcategories)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SubCategories  $subcategories
     * @return \Illuminate\Http\Response
     */
    public function update(StoreSubCategoriesRequest $request, SubCategories $subcategories, $id)
    {
        $subcategories = SubCategories::findOrFail($id);

        $subcategories->update($request->all());

        return response()->json([
            'status' => true,
            'message' => "SubCategorie Updated successfully!",
            'subcategories' => $subcategories
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SubCategories  $subcategories
     * @return \Illuminate\Http\Response
     */
    public function destroy(SubCategories $subcategories, $id)
    {
        $subcategories = SubCategories::findOrFail($id);

        $subcategories->delete();

        return response()->json([
            'status' => true,
            'message' => "SubCategorie Deleted successfully!",
        ], 200);
    }
}
