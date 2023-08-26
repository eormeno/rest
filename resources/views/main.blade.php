<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Dynamic Site</title>
    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <link href="{{ asset('css/output.css') }}" rel="stylesheet">
</head>

<body class="antialiased bg-gray-100">
    <div id="content"></div>

    <!-- Status Bar -->
    <div class="bg-slate-300 p-1 fixed bottom-0 left-0 right-0">
        <p id="version" class="text-center text-slate-600 text-sm font-light"></p>
    </div>

    <script type="module" src="{{ asset('js/button.component.js') }}"></script>
    <script type="module" src="{{ asset('js/form.component.js') }}"></script>
    <script type="module" src="{{ asset('js/input.component.js') }}"></script>
    <script type="module" src="{{ asset('js/paragraph.component.js') }}"></script>
    <script type="module" src="{{ asset('js/starter.js') }}"></script>

</body>

</html>
