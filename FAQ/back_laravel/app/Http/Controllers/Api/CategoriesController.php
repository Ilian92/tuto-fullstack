<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreCategoriesRequest;
use App\Http\Controllers\Controller;
use App\Models\Categories;
use Illuminate\Support\Str;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Categories::all();

        return response()->json([
            'status' => true,
            'categories' => $categories
        ]);
    }

    public function vue()
    {
        return view('categories');
    }

    public function add($id = null)
    {
        if (!empty($id)) {
            $categorie = Categories::where('slug', '=', $id)->first();
            return view('categories/add', compact('categorie'));
        } else {
            $categorie = null;
            return view('categories/add', compact('categorie'));
        }
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
    public function store(StoreCategoriesRequest $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $categories = Categories::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name, '-')
        ]);

        return response()->json([
            'status' => true,
            'message' => "Categorie Created successfully!",
            'categories' => $categories
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $categories = Categories::where('slug', '=', $slug)->firstOrFail();

        return response()->json([
            'status' => true,
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function edit(Categories $categories)
    {
        // return view('categories.edit', compact('categories'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function update(StoreCategoriesRequest $request, Categories $categories, $slug)
    {
        // $categories = Categories::findOrFail($slug);

        $categories = Categories::where('slug', '=', $slug)->firstOrFail();

        $categories->update($request->all());

        return response()->json([
            'status' => true,
            'message' => "Categorie Updated successfully!",
            'categories' => $categories
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function destroy(Categories $categories, $id)
    {
        $categories = Categories::findOrFail($id);

        // $categories = Categories::where('slug', '=', $slug)->firstOrFail();

        $categories->delete();

        return response()->json([
            'status' => true,
            'message' => "Categorie Deleted successfully!",
        ], 200);
    }
}
