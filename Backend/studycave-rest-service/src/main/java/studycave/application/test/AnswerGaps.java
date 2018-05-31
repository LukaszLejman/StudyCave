package studycave.application.test;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class AnswerGaps extends Answer{
	private String[] content = new String[25];
	
	@Column(name="is_gap")
	@JsonProperty("is_gap")
	private boolean gap;
	
    public AnswerGaps() {
    	super();
    }

	public String[] getContent() {
		return content;
	}

	public void setContent(String[] content) {
		this.content = content;
	}

	public boolean isGap() {
		return gap;
	}

	public void setGap(boolean gap) {
		this.gap = gap;
	}
	
	
}
