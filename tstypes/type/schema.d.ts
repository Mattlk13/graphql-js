import Maybe from '../tsutils/Maybe';
import { SchemaDefinitionNode, SchemaExtensionNode } from '../language/ast';
import { GraphQLDirective } from './directives';
import {
  GraphQLType,
  GraphQLNamedType,
  GraphQLAbstractType,
  GraphQLObjectType,
} from './definition';

/**
 * Test if the given value is a GraphQL schema.
 */
export function isSchema(schema: any): schema is GraphQLSchema;
export function assertSchema(schema: any): GraphQLSchema;

/**
 * Schema Definition
 *
 * A Schema is created by supplying the root types of each type of operation,
 * query and mutation (optional). A schema definition is then supplied to the
 * validator and executor.
 *
 * Example:
 *
 *     const MyAppSchema = new GraphQLSchema({
 *       query: MyAppQueryRootType,
 *       mutation: MyAppMutationRootType,
 *     })
 *
 * Note: If an array of `directives` are provided to GraphQLSchema, that will be
 * the exact list of directives represented and allowed. If `directives` is not
 * provided then a default set of the specified directives (e.g. @include and
 * @skip) will be used. If you wish to provide *additional* directives to these
 * specified directives, you must explicitly declare them. Example:
 *
 *     const MyAppSchema = new GraphQLSchema({
 *       ...
 *       directives: specifiedDirectives.concat([ myCustomDirective ]),
 *     })
 *
 */
export class GraphQLSchema {
  extensions: Maybe<Readonly<Record<string, any>>>;
  astNode: Maybe<SchemaDefinitionNode>;
  extensionASTNodes: Maybe<ReadonlyArray<SchemaExtensionNode>>;

  constructor(config: GraphQLSchemaConfig);
  getQueryType(): Maybe<GraphQLObjectType>;
  getMutationType(): Maybe<GraphQLObjectType>;
  getSubscriptionType(): Maybe<GraphQLObjectType>;
  getTypeMap(): TypeMap;
  getType(name: string): Maybe<GraphQLNamedType>;
  getPossibleTypes(
    abstractType: GraphQLAbstractType,
  ): ReadonlyArray<GraphQLObjectType>;

  isPossibleType(
    abstractType: GraphQLAbstractType,
    possibleType: GraphQLObjectType,
  ): boolean;

  getDirectives(): ReadonlyArray<GraphQLDirective>;
  getDirective(name: string): Maybe<GraphQLDirective>;

  toConfig(): GraphQLSchemaConfig & {
    types: GraphQLNamedType[];
    directives: GraphQLDirective[];
    extensions: Maybe<Readonly<Record<string, any>>>;
    extensionASTNodes: ReadonlyArray<SchemaExtensionNode>;
    assumeValid: boolean;
  };
}

type TypeMap = { [key: string]: GraphQLNamedType };

export interface GraphQLSchemaValidationOptions {
  /**
   * When building a schema from a GraphQL service's introspection result, it
   * might be safe to assume the schema is valid. Set to true to assume the
   * produced schema is valid.
   *
   * Default: false
   */
  assumeValid?: boolean;
}

export interface GraphQLSchemaConfig extends GraphQLSchemaValidationOptions {
  query: Maybe<GraphQLObjectType>;
  mutation?: Maybe<GraphQLObjectType>;
  subscription?: Maybe<GraphQLObjectType>;
  types?: Maybe<GraphQLNamedType[]>;
  directives?: Maybe<GraphQLDirective[]>;
  extensions?: Maybe<Readonly<Record<string, any>>>;
  astNode?: Maybe<SchemaDefinitionNode>;
  extensionASTNodes?: Maybe<ReadonlyArray<SchemaExtensionNode>>;
}
