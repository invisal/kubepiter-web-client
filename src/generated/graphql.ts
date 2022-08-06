export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GqlApp = {
  __typename?: 'App';
  cluster?: Maybe<Scalars['String']>;
  env?: Maybe<Array<Maybe<GqlAppEnvironmentVariable>>>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['String']>;
  ingress?: Maybe<Array<Maybe<GqlAppIngress>>>;
  lastBuildJob?: Maybe<GqlBuildJob>;
  name?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['Int']>;
  replicas?: Maybe<Scalars['Int']>;
  staticVersion?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export type GqlAppEnvironmentVariable = {
  __typename?: 'AppEnvironmentVariable';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type GqlAppEnvironmentVariableInput = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type GqlAppIngress = {
  __typename?: 'AppIngress';
  host?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
};

export type GqlAppIngressInput = {
  host?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
};

export type GqlAppInput = {
  cluster?: InputMaybe<Scalars['String']>;
  env?: InputMaybe<Array<InputMaybe<GqlAppEnvironmentVariableInput>>>;
  image?: InputMaybe<Scalars['String']>;
  ingress?: InputMaybe<Array<InputMaybe<GqlAppIngressInput>>>;
  name?: InputMaybe<Scalars['String']>;
  namespace?: InputMaybe<Scalars['String']>;
  port?: InputMaybe<Scalars['Int']>;
  replicas?: InputMaybe<Scalars['Int']>;
  staticVersion?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
};

export type GqlBuildJob = {
  __typename?: 'BuildJob';
  appId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  logs?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type GqlCluster = {
  __typename?: 'Cluster';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type GqlDeployResponse = {
  __typename?: 'DeployResponse';
  message?: Maybe<Scalars['String']>;
  yaml?: Maybe<Scalars['String']>;
};

export type GqlKubeNode = {
  __typename?: 'KubeNode';
  name?: Maybe<Scalars['String']>;
};

export type GqlLoginResponse = {
  __typename?: 'LoginResponse';
  token?: Maybe<Scalars['String']>;
};

export type GqlMutation = {
  __typename?: 'Mutation';
  createApp?: Maybe<Scalars['String']>;
  deployApp?: Maybe<GqlDeployResponse>;
  login?: Maybe<GqlLoginResponse>;
  updateApp?: Maybe<Scalars['Boolean']>;
};


export type GqlMutationCreateAppArgs = {
  id: Scalars['ID'];
  value?: InputMaybe<GqlAppInput>;
};


export type GqlMutationDeployAppArgs = {
  id: Scalars['ID'];
  remote?: InputMaybe<Scalars['Boolean']>;
};


export type GqlMutationLoginArgs = {
  password: Scalars['String'];
  ttl?: InputMaybe<Scalars['Int']>;
  username: Scalars['String'];
};


export type GqlMutationUpdateAppArgs = {
  id: Scalars['ID'];
  value?: InputMaybe<GqlAppInput>;
};

export type GqlQuery = {
  __typename?: 'Query';
  app?: Maybe<GqlApp>;
  apps?: Maybe<Array<Maybe<GqlApp>>>;
  clusters?: Maybe<Array<Maybe<GqlCluster>>>;
  me?: Maybe<GqlUser>;
  nodes?: Maybe<Array<Maybe<GqlKubeNode>>>;
  registries?: Maybe<Array<Maybe<GqlRegistry>>>;
  version?: Maybe<Scalars['String']>;
};


export type GqlQueryAppArgs = {
  id: Scalars['ID'];
};

export type GqlRegistry = {
  __typename?: 'Registry';
  auth?: Maybe<Scalars['String']>;
  managed?: Maybe<Scalars['Boolean']>;
  name: Scalars['ID'];
};

export type GqlUser = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
};
