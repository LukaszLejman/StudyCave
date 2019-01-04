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
	int points;
	@ApiModelProperty
	String comment;

	public VerifyDto() {
		super();
	}

	public int getPoints() {
		return points;
	}
	public void setPoints(int points) {
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
