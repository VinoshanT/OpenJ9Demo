class BinarySearch {

	static boolean binarySearch(int arr[], int l, int r, int x) { 
		if (r >= l) { 
			int mid = l + (r - l) / 2; 
	
			if (arr[mid] == x) 
				return true; 
	
			if (arr[mid] > x) 
				return binarySearch(arr, l, mid - 1, x); 
	
			return binarySearch(arr, mid + 1, r, x); 
		} 
  
		return false; 
	} 

	public static void main(String[] args) {
		int arr[] = { 2, 3, 4, 6, 8, 12, 18, 19, 20, 29, 35, 44, 75, 99 };
		
		System.out.print("List: ");
		for(int i = 0; i < arr.length; i++) {
			System.out.print(arr[i] + " ");
		}
		System.out.println();
		
		System.out.println("Search for 2: " + binarySearch(arr, 0, arr.length - 1, 2));
		System.out.println("Search for 5: " + binarySearch(arr, 0, arr.length - 1, 5));
		System.out.println("Search for 20: " + binarySearch(arr, 0, arr.length - 1, 20));
		System.out.println("Search for 34: " + binarySearch(arr, 0, arr.length - 1, 34));
		System.out.println("Search for 35: " + binarySearch(arr, 0, arr.length - 1, 35));
	}

}