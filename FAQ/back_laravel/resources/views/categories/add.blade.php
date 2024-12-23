@extends('layouts.app')
@section('content')

@php
$i = "";
$a = "";
if(!is_null($categorie)) {
$i = $categorie->slug;
$a = $categorie->name;
}

@endphp

<div id="createCategories" nom={{$a}} slug={{$i}}>
</div>
<!-- @if(!is_null($categorie))
<h1>{{$categorie->slug}}</h1>
@endif -->
@endsection