package studycave.application.flashcard;

public class FlashcardTestDTO {
    private Long id;
    private String content;
    private String side;
    
    public FlashcardTestDTO() {
    	
    }
    
    

	public FlashcardTestDTO(Long id, String content, String side) {
		super();
		this.id = id;
		this.content = content;
		this.side = side;
	}



	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}



	public String getContent() {
		return content;
	}



	public void setContent(String content) {
		this.content = content;
	}



	public String getSide() {
		return side;
	}



	public void setSide(String side) {
		this.side = side;
	}
	

    
	
    
}
