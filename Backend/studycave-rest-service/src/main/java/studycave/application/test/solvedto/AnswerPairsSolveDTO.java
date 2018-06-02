package studycave.application.test.solvedto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import studycave.application.test.AnswerPairs;

public class AnswerPairsSolveDTO extends AnswerPairs {
	
	@JsonIgnore
	private Long id;
	@JsonIgnore
    private String first;
	@JsonIgnore
    private String second;
	
	
	private List<String> left = new ArrayList<String>();
	private List<String> right = new ArrayList<String>();
	
	
	
	public AnswerPairsSolveDTO(List<String> left, List<String> right) {
		super();
		this.left = left;
		this.right = right;
	}
	public List<String> getLeft() {
		return left;
	}
	public void setLeft(List<String> left) {
		this.left = left;
	}
	public List<String> getRight() {
		return right;
	}
	public void setRight(List<String> right) {
		this.right = right;
	}
	
	
	
}
