<?php

declare(strict_types=1);

require __DIR__ . '/vendor/autoload.php';

use Apollo\Federation\FederatedSchema;
use GraphQL\Server\StandardServer;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

try {
    $queryType = new ObjectType([
        'name' => 'Query',
        'fields' => [
            'echo' => [
                'type' => Type::string(),
                'args' => [
                    'message' => ['type' => Type::string()],
                ],
                'resolve' => static function (array $rootValue, array $args): string {
                    return $rootValue['prefix'] . $args['message'];
                },
            ],
        ],
    ]);

    $mutationType = new ObjectType([
        'name' => 'Mutation',
        'fields' => [
            'sum' => [
                'type' => Type::int(),
                'args' => [
                    'x' => ['type' => Type::int()],
                    'y' => ['type' => Type::int()],
                ],
                'resolve' => static function (array $rootValue, array $args): int {
                    return $args['x'] + $args['y'];
                },
            ],
        ],
    ]);
    
    $schema = new FederatedSchema([
        'query' => $queryType,
        'mutation' => $mutationType,
    ]);

    $rootValue = ['prefix' => 'You said: '];

    $server = new StandardServer([
        'schema' => $schema,
        'rootValue' => $rootValue,
    ]);

    $server->handleRequest();
} catch (Throwable $e) {
    StandardServer::send500Error($e);
}