import Component from '@glimmer/component';

export default Ember.Component.extend ({
    actions: {
        start: function() {
            alert('Button working correctly');
        }
    }
});