package studycave.application.test.verify;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class ResultPairs extends Result{
	
	@JsonIgnore
	protected Long id;
	protected String left;
	protected String right;
	
	public ResultPairs(Long id, Boolean correct) {
		super(id, correct);
		// TODO Auto-generated constructor stub
	}
	
	public ResultPairs(String left, String right, Boolean correct) {
		super(null, correct);
		this.left=left;
		this.right=right;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLeft() {
		return left;
	}

	public void setLeft(String left) {
		this.left = left;
	}

	public String getRight() {
		return right;
	}

	public void setRight(String right) {
		this.right = right;
	}

	
	
}
