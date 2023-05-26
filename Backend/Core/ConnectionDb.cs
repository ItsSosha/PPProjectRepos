namespace Core
{
    public class ConnectionDb
    {
        public string ConnectionString { get; }

        public ConnectionDb(string connectionString)
        {
            ConnectionString = connectionString;
        }
    }
}
