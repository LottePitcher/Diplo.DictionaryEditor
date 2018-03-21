﻿(function () {
    'use strict';

    angular.module("umbraco").controller("DiploDictionaryEditorController",
        function ($scope, $routeParams, notificationsService, eventsService, navigationService, diploDictionaryResources) {

            $scope.criteria = {};
            $scope.orderByOptions = [ 'Default', 'Alphabetic' ];
            $scope.criteria.orderby = "Default";
            $scope.criteria.language = null;

            $scope.isLoading = true;

            diploDictionaryResources.getEntireDictionary().then(function (response) {
                $scope.isLoading = false;
                $scope.dictionary = response;

            }, function (response) {
                notificationsService.error("Error", "Could not load dictionary. Ooops.");
            });

            diploDictionaryResources.getLanguages().then(function (response) {
                $scope.languages = response;

            }, function (response) {
                notificationsService.error("Error", "Could not load dictionary languages. Ooops.");
            });

            $scope.submit = function () {

                diploDictionaryResources.updateDictionary($scope.dictionary).then(function (response) {

                    if (response.IsSuccess) {
                        notificationsService.success("Items Saved", response.Message);
                    } else {
                        notificationsService.warning("Warning", response.Message);
                    }

                }, function (response) {
                    notificationsService.error("Error", response);
                });
            };


        });
})();