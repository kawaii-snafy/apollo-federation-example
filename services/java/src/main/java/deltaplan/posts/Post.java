package deltaplan.posts;

public class Post extends deltaplan.posts.generated.types.Post {
    private String authorId;

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public Post(){

    }

    public Post(String id, String title, String authorId) {
        this.setId(id);
        this.setTitle(title);
        this.authorId = authorId;
    }
}

