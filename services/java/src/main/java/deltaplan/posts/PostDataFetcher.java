package deltaplan.posts;

import com.netflix.graphql.dgs.*;
import deltaplan.posts.generated.types.User;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@DgsComponent
public class PostDataFetcher {
    private final List<Post> posts = List.of(
            new Post("1", "Post 1", "1"),
            new Post("2", "Post 2", "1"),
            new Post("3", "Post 3", "2"),
            new Post("4", "Post 4", "2"),
            new Post("5", "Post 5", "3")
    );

    @DgsQuery
    public List<Post> posts() {
        return posts;
    }

    @DgsEntityFetcher(name = "User")
    public User user(Map<String, Object> values) {
        return new User((String) values.get("id"), null);
    }

    @DgsData(parentType = "User", field = "posts")
    public List<Post> postsFetcher(DgsDataFetchingEnvironment dataFetchingEnvironment) {
        User user = dataFetchingEnvironment.getSource();

        return posts.stream().filter(s -> s.getAuthorId().equals(user.getId())).collect(Collectors.toList());
    }
}

