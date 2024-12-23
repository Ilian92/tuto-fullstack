@extends('layouts.app')

@section('content')
<div class="p-3 bg-slate-100 rounded-md mx-10">
    <div class="card">
        <div class="mb-1.5">{{ __('Dashboard') }}</div>

        <div class="">
            @if (session('status'))
            <div class="" role="alert">
                {{ session('status') }}
            </div>
            @endif

            {{ __('You are logged in!') }}
        </div>
    </div>
</div>
@endsection