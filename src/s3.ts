import { S3Bucket } from '@cdktf/provider-aws/lib/s3-bucket';
import { Construct } from 'constructs';

export interface S3Config {
  bucketName: string;
  prefix: string;
}

export class Bucket extends S3Bucket {
  /**
   * Create a new {@link https://www.terraform.io/docs/providers/aws/r/s3_bucket aws_s3_bucket} Based on the AXA Group Policies
   *
   * @param scope The scope in which to define this construct
   * @param name The name, used in the resourceNaming method to retrieve the right nomenclature.
   * @param config S3Config = {}
   */
  constructor(scope: Construct, config: S3Config) {
    super(scope, `${config.prefix}-${config.bucketName}-bucket`, {
      bucketPrefix: config.prefix,
      bucket: config.bucketName,
    });
  }
}
