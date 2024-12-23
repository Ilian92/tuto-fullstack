<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreQuestionsRequest;
use App\Http\Controllers\Controller;
use App\Models\Questions;
use Illuminate\Support\Str;

class QuestionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $questions = Questions::all();

        return response()->json([
            'status' => true,
            'questions' => $questions
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
    public function store(StoreQuestionsRequest $request)
    {
        $request->validate([
            'question' => 'required',
            'answer' => 'required'
        ]);

        $questions = Questions::create([
            'question' => $request->question,
            'answer' => $request->answer,
            'ordre' => $request->ordre,
            'slug' => Str::slug($request->question, '-')
        ]);

        return response()->json([
            'status' => true,
            'message' => "Question Created successfully!",
            'questions' => $questions
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Questions  $questions
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $questions = Questions::where('slug', '=', $slug)->firstOrFail();

        return response()->json([
            'status' => true,
            'questions' => $questions
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Questions  $questions
     * @return \Illuminate\Http\Response
     */
    public function edit(Questions $questions)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Questions  $questions
     * @return \Illuminate\Http\Response
     */
    public function update(StoreQuestionsRequest $request, Questions $questions, $id)
    {
        $questions = Questions::findOrFail($id);

        $questions->update($request->all());

        return response()->json([
            'status' => true,
            'message' => "Question Updated successfully!",
            'questions' => $questions
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Questions  $questions
     * @return \Illuminate\Http\Response
     */
    public function destroy(Questions $questions, $id)
    {
        $questions = Questions::findOrFail($id);

        $questions->delete();

        return response()->json([
            'status' => true,
            'message' => "Question Deleted successfully!",
        ], 200);
    }
}
