var app = angular.module('contact', ['ui.bootstrap']);

app.controller('ContactController', ['$scope', '$location', 'EmailService',
    function ($scope, $location, EmailService) {
      window.scrollTo(0, 0);

      $scope.alerts = [
        { type: 'danger', msg: 'Something went wrong. Please try to submit again.' },
        { type: 'success', msg: 'Your message has been submitted. You should hear from us soon.' }
      ];

      $scope.submit = function (contact) {
        if ($scope.contactForm.$valid) {
          $scope.sending = true;
    
          EmailService.sendEmail(contact, function () {
            $scope.alert = $scope.alerts[1];
            $scope.contact = {};
            $scope.contactForm.$setPristine();
            $scope.contactForm.$setUntouched();
            $scope.showAlert = true;
            $scope.sending = false;
          }, function (error) {
            console.log(error);
            $scope.alert = $scope.alerts[0];
            $scope.showAlert = true;
            $scope.sending = false;
          });
        }
      };

      $scope.isDisabled = function (contactForm) {
        return contactForm.email.$touched && contactForm.email.$invalid || 
              contactForm.message.$touched && contactForm.message.$invalid ||
              contactForm.email.$untouched || contactForm.message.$untouched;
      };
    }
  ]);