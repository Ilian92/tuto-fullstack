<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreAvisRequest;
use App\Http\Controllers\Controller;
use App\Models\Avis;
use Illuminate\Support\Str;

class AvisController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $avis = Avis::all();

        return response()->json([
            'status' => true,
            'avis' => $avis
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
    public function store(StoreAvisRequest $request)
    {
        $request->validate([
            'helpful' => 'required',
            'comment' => 'required'
        ]);

        $avis = Avis::create([
            'helpful' => $request->helpful,
            'comment' => $request->comment,
            'slug' => Str::slug($request->helpful, '-')
        ]);

        return response()->json([
            'status' => true,
            'message' => "Avi Created successfully!",
            'avis' => $avis
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Avis  $avis
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $avis = Avis::where('slug', '=', $slug)->firstOrFail();

        return response()->json([
            'status' => true,
            'avis' => $avis
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Avis  $avis
     * @return \Illuminate\Http\Response
     */
    public function edit(Avis $avis)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Avis  $avis
     * @return \Illuminate\Http\Response
     */
    public function update(StoreAvisRequest $request, Avis $avis, $id)
    {
        $avis = Avis::findOrFail($id);

        $avis->update($request->all());

        return response()->json([
            'status' => true,
            'message' => "Avi Updated successfully!",
            'avis' => $avis
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Avis  $avis
     * @return \Illuminate\Http\Response
     */
    public function destroy(Avis $avis, $id)
    {
        $avis = Avis::findOrFail($id);

        $avis->delete();

        return response()->json([
            'status' => true,
            'message' => "Avi Deleted successfully!",
        ], 200);
    }
}
