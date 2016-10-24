# javascript-training

## install

Run:

    npm install

# customize

edit `karma.conf.js` file and modify following properties:

 * `browsers` - define which browsers to run tests on
 * `specReporter` - uncomment lines to remove skipped tests in output (this is useful for development, but should *NOT* be committed to the repo)

changing `karma.conf.js` requires *restarting karma*.

## run

single run (compile & test once, useful for CI):

    npm test -- --single-run

development run (compile & test initially + for each file change, useful for development):

    npm test

## in-browser api

Make sure you installed `http-server` and run:

    npm run api

then open browser tab, open devtools console and start accessing the mocked API. 

## running single tests

You can temporarily adapt jasmine tests to run *only few specific tests* (one
or more) to save time, not to execute all the tests you have. In order to do
that, use [focus](http://jasmine.github.io/2.6/focused_specs.html)
and [exclude](https://jasmine.github.io/2.6/introduction.html#section-Disabling_Suites):

 * replace `it()` with `fit()`/`xit()` **and/or**
 * replace `describe()` tiwh `fdescribe()`/`xdescribe()`

Important thing, however, is **not to push** these temporary changes (`fit`,
`xit`, `fdescribe`, `xdescribe`) to the repository.

## custom matchers

 * see [Jasmine-Matchers](https://github.com/JamieMason/Jasmine-Matchers)

## progress

In the beginning, most of the tests are failing:

      Something
        important
          ×can be used
          ×is useful
          ×works like a charm

Your task is to learn JavaScript and make tests pass. Eventually, tests should look more or less like the following:

      Something
        important
          √can be used
          √is useful
          √works like a charm
