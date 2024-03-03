#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IBankigAccountStack } from '../lib/i_bankig_account-stack';

const app = new cdk.App();
new IBankigAccountStack(app, 'IBankigAccountStack', {
});