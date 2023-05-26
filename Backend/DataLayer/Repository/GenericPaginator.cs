using Core;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.Repository;

public static class GenericPaginator
{
    public static async Task<ResultPage<T>> Paginate<T>(IQueryable<T> dbSet, int offset, int limit)
    {
        var result = dbSet.Skip(offset).Take(limit);

        return new ResultPage<T>()
        {
            Total = dbSet.Count(),
            Result = await result.ToListAsync()
        };
    }
}