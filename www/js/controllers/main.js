angular.module('starter')
  .controller('mainController', [
      '$scope',
      '$state',
      '$cordovaCamera',
      '$cordovaSocialSharing',
      'Items',
      'Imgr',
      function ($scope, $state, $cordovaCamera,$cordovaSocialSharing, Items, Imgr) {
        $scope.items = Items.fetch();
        $scope.currentItem = {}
        
        if( window.cordova ) {
          this.camera = function(){};

          this.share = function(item){};
        }
        else 
        {
          this.camera = function(){
            var randomImage =  Math.floor(Math.random() * 4) + 1;
            // Usage
            Imgr.transformUrl('img/' + randomImage + '.jpg', function(dataUri) {
                $scope.currentItem.image = dataUri;
            });
            
            $state.go('annotate');
          };

          this.share = function(item){
            alert('share!');
          };

        }

        this.removeItem = function( item ){}

        $scope.resetCurrentItem = function(){
          $scope.currentItem = {
            description: '',
            title: '',
            image: ''
          };
        }

       

        $scope.$on('LocalStorageModule.notification.setitem', function () {
          $scope.items = Items.fetch();
        });

        $scope.$on('LocalStorageModule.notification.removeitem', function () {      
          $scope.items = Items.fetch();
        });
      


      
      }])