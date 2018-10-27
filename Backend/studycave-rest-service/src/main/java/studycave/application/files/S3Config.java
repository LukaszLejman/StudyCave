package studycave.application.files;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
 
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
 
@Configuration
public class S3Config {
	//@Value("${jsa.aws.access_key_id}")
	private String awsId="AKIAJH3YTAM7EJKL56YA";
 
	//@Value("${jsa.aws.secret_access_key}")
	private String awsKey="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";
	
	//@Value("${jsa.s3.region}")
	private String region="eu-west-1";
 
	@Bean
	public AmazonS3 s3client() {
		
		BasicAWSCredentials awsCreds = new BasicAWSCredentials(awsId, awsKey);
		AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withRegion(Regions.fromName(region)).withCredentials(new AWSStaticCredentialsProvider(awsCreds)).build();
		
		return s3Client;
	}
}