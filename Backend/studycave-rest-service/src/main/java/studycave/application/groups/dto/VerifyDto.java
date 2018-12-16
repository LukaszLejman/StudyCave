package studycave.application.groups.dto;

import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModelProperty;

public class VerifyDto {

	public enum VerifyType {
		ACCEPTED, REJECTED;
	}
	
	@ApiModelProperty
	@NotNull
	VerifyType status;
	@ApiModelProperty
	float points;
	@ApiModelProperty
	String comment;

	public VerifyDto() {
		super();
	}

	public float getPoints() {
		return points;
	}
	public void setPoints(float points) {
		this.points = points;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}

	public VerifyType getStatus() {
		return status;
	}

	public void setStatus(VerifyType status) {
		this.status = status;
	}
}
