#Responsive Pushdown

A responsive Pushdown. Much like the accordion except that available items are laid out in a grid instead of a single stack.


##Setup

Add `jquery.js`, `pushdown.js`, and `pushdown.css` to your html.

###Defining a Pushdown

A Pushdown is defined using the following html structure:
	
	.pushdown
		.pushdown-item
		.pushdown-content
			.pushdown-close (optional)

For example:

	<div id="hotels">
		<div class="pushdown">
			<div class="pushdown-item">
				The Venetian
			</div>
			<div class="pushdown-content">
				More information about The Venetian goes here.
				This information will be hidden until the above `.pushdown-item` is clicked.
			</div>
		</div>
		<div class="pushdown">
			<div class="pushdown-item">
				Bellagio
			</div>
			<div class="pushdown-content">
				More information about Bellagio goes here.
				This information will be hidden until the above `.pushdown-item` is clicked.
			</div>
		</div>
		
###Initializing a Pushdown

A Pushdown is initialized by invoking the `pushdown` jquery plugin on the direct parent of `.pushdown` elements. If we use the example above we would initialize the Pushdown like this: `$('#hotels').pushdown();`

###Defninig a Close Button

The `.pushdown-content` element can optionally contain any number of `.pushdown-close` elements. A click on such an element will close the currently opened Pushdown item.

For example:

	<div class="pushdown">
		<div class="pushdown-item">
			The Venetian
		</div>
		<div class="pushdown-content">
			<a class="pushdown-close">Close</a>
			More information about The Venetian goes here.
		</div>
	</div>

##License
The MIT License (MIT)

Copyright (c) 2013 Igor Vaynberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


