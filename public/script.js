// CLIENT-SIDE JAVASCRIPT

$(function() {

  // foodsController` holds all our food funtionality
  var foodsController = {
    
    // compile food food-template
    template: _.template($('#food-template').html()),

    // pass each food object through template and append to view
    render: function(foodObj) {
      var $foodHtml = $(foodsController.template(foodObj));
      $('#food-list').append($foodHtml);
    },

    all: function() {
      // send GET request to server to get all foods
      $.get('/api/foods', function(data) {
        var allfoods = data;
        
        // iterate through each food
        _.each(allFoods, function(food) {
          foodsController.render(food);
        });
        
        // add event-handers for updating/deleting
        foodsController.addEventHandlers();
      });
    },

    create: function(newName, newOrigin, newDesc,) {
      var foodData = {name: newName, origin: newOrigin, decs; newDesc};
      
      // send POST request to server to create new food
      $.post('/api/foods', foodData, function(data) {
        var newFood = data;
        foodsController.render(newFood);
      });
    },

    update: function(foodId, updatedName, updatedOrigin, updateDesc) {
      // send PUT request to server to update food
      $.ajax({
        type: 'PUT',
        url: '/api/foods/' + foodId,
        data: {
          name: updatedName,
          origin: updatedOrigin,
          desc; updatedDesc
        },
        success: function(data) {
          var updatedFood = data;

          // replace existing food in view with updated food
          var $foodHtml = $(foodsController.template(updatedFood));
          $('#food-' + foodId).replaceWith($foodHtml);
        }
      });
    },
    
    delete: function(foodId) {
      // send DELETE request to server to delete food
      $.ajax({
        type: 'DELETE',
        url: '/api/foods/' + foodId,
        success: function(data) {
          
          // remove deleted food from view
          $('#food-' + foodId).remove();
        }
      });
    },

    // add event-handlers to food for updating/deleting
    addEventHandlers: function() {
      $('#food-list')

        // for update: submit event on `.update-food` form
        .on('submit', '.update-food', function(event) {
          event.preventDefault();
          
          // find the food's id (stored in HTML as `data-id`)
          var foodId = $(this).closest('.food').attr('data-id');
          
          // udpate the food with form data
          var updatedName = $(this).find('.updated-name').val();
          var updatedOrigin = $(this).find('.updated-origin').val();
          var updatedDesc = $(this).find('.updated-desc').val();
          foodsController.update(foodId, updatedName, updatedOrigin, updateDesc);
        })
        
        // for delete: click event on `.delete-food` button
        .on('click', '.delete-food', function(event) {
          event.preventDefault();

          // find the food's id
          var foodId = $(this).closest('.food').attr('data-id');
          
          // delete the food
          foodsController.delete(foodId);
        });
    },

    setupView: function() {
      // append existing foods to view
      foodsController.all();
      
      // add event-handler to new-food form
      $('#new-food').on('submit', function(event) {
        event.preventDefault();
        
        // create new food with form data
        var newName = $('#new-name').val();
        var newOrigin = $('#new-origin').val();
        var newDesc = $('#new-desc').val();
        foodsController.create(newName, newOrigin, newDesc);
        
        // reset the form
        $(this)[0].reset();
        $('#new-name').focus();
      });
    }
  };

  foodsController.setupView();

});