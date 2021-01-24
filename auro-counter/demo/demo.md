# auro-counter

The `auro-counter` component renders a basic numerical counter which can be manually increased and decreased by clicking on + and - buttons. Optionally, the component also supports value changes using the keyboard arrow keys. Minimum and maximum values are also supported which can be used in combination to constrain upper and lower bounds.

Illustrated in this example is a stand-alone use of `auro-counter`.
## Optional Parameters

`auro-counter` supports multiple parameters to control interaction and constraints.
### Setting the values and constraints of the counter

* `currentValue` Start the counter at a given integer value; defaults to 0
* `minValue` Set the lower boundary as an integer value, null value has no lower boundary; defaults to null
* `maxValue` Set the upper boundary as an integer value, null value has no upper boundary; defaults to null

### Defining keyboard controls

Default web client behavior is to scroll the page content when pressing the keyboard arrow keys. Optionally, the `auro-counter` component can override the behavior and use those keys to control the counter.

* `udKeys` Short for "up down Keys". When included the up arrow key will increase the counter value by 1 and the down arrow key will decrease the value by 1.
* `lrKeys` Short for "left right Keys". When included the right arrow key will increase the counter value by 1 and the left arrow key will decrease the value by 1.

<div class="exampleWrapper">
  <auro-counter
    currentValue="0"
    minValue="0"
    maxValue="10"
    udKeys
    lrKeys>
  </auro-counter>
</div>

<auro-accordion lowProfile justifyRight>
  <span slot="trigger">See code</span>

  ```html
    <auro-counter
      currentValue="0"
      minValue="0"
      maxValue="10"
      udKeys
      lrKeys>
    </auro-counter>
  ```

</auro-accordion>
