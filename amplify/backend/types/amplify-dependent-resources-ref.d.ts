export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "Meal": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "api": {
        "Meal": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "storage": {
        "s3mealstorageba2ebc6e": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}