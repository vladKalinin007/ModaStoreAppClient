import * as e from "express";

export enum DevEnvironment {
    PRODUCTION = 'false',
    API_URL = 'http://localhost:4300/api/',
    STRIPE_PUBLIC_KEY = 'pk_test_51H4W1pK0zW2cLxk4Y6q3j6v4mQmZq5Y3fZ1n1q6ZB1Qg1Iz5Z6dXjX5d7m0b7aK7c6J3j2v9Q8w6MlHm4Y1UqJ0z00Hv0aKU8Q'
}

export enum ProdEnvironment {
    PRODUCTION = 'true',
    API_URL = 'https://modastoreapi.up.railway.app/api/',
    STRIPE_PUBLIC_KEY = 'pk_test_51H4W1pK0zW2cLxk4Y6q3j6v4mQmZq5Y3fZ1n1q6ZB1Qg1Iz5Z6dXjX5d7m0b7aK7c6J3j2v9Q8w6MlHm4Y1UqJ0z00Hv0aKU8Q'
}